import { NextRequest, NextResponse } from "next/server";
import { render } from "takumi-pdf/next";
import { templates, type TemplateSlug } from "@/lib/pdf/templates";
import { parseThemedSlug } from "@/lib/pdf/themes/catalog";
import { vocabulary } from "@/lib/pdf/themes/vocabulary";
import { resolveWordImages } from "@/lib/pdf/serverImages";
import React from "react";
import JSZip from "jszip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function stripEmoji(str: string): string {
  return str
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2700}-\u{27BF}]/gu, "")
    .replace(/[\u{2B50}\u{2B55}\u{2702}\u{270F}\u{2714}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
function stripEmojisFromNode(node: unknown): unknown {
  if (typeof node === "string") return stripEmoji(node);
  if (Array.isArray(node)) return node.map(stripEmojisFromNode);
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: unknown }>;
    const props = el.props as Record<string, unknown>;
    const newProps: Record<string, unknown> = { ...props };
    if (typeof props.children === "string") newProps.children = stripEmoji(props.children);
    else if (props.children != null) newProps.children = stripEmojisFromNode(props.children);
    return React.cloneElement(el, newProps);
  }
  return node;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const slugsParam = url.searchParams.get("slugs") || url.searchParams.get("slug") || "";
  const name = url.searchParams.get("name") || undefined;
  const date = url.searchParams.get("date") || undefined;
  const eko = url.searchParams.get("eko") === "1" || url.searchParams.get("eko") === "true";

  if (!slugsParam) return NextResponse.json({ error: "Provide ?slugs=syczacy,szumiacy-hawaje,..." }, { status: 400 });

  const slugs = slugsParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20); // limit 20 per request (84 via multiple calls or ?all=1)

  const unknown = slugs.filter((s) => !(s in templates));
  if (unknown.length) return NextResponse.json({ error: `Unknown slugs: ${unknown.join(",")}`, available: Object.keys(templates).slice(0, 10) }, { status: 404 });

  let fonts: unknown = undefined;
  try {
    const { kidFonts } = await import("@/lib/pdf/fonts");
    fonts = await kidFonts();
  } catch {
    fonts = undefined;
  }

  const zip = new JSZip();

  for (const slug of slugs) {
    const tpl = templates[slug as TemplateSlug];
    const props: Record<string, unknown> = { name, date, eko };
    if (slug === "katalog") {
      try {
        const QRCode = await import("qrcode");
        props.qr = await QRCode.toDataURL("https://sklep.logopedia.pl", { width: 200, margin: 1 });
      } catch {}
    }
    const themed = parseThemedSlug(slug);
    if (themed) {
      const themedWords = vocabulary.wordsFor(themed.theme, themed.szereg).map((w) => w.w);
      const imgs = resolveWordImages(themedWords);
      if (Object.keys(imgs).length) props.images = imgs;
    }
    const raw = (tpl.component as (p?: Record<string, unknown>) => React.ReactElement)(props);
    const element = stripEmojisFromNode(raw) as React.ReactElement;
    const pdf = await render(element as never, { size: "a4", margin: 0, fonts: fonts as never });
    const bytes = pdf as unknown as Uint8Array;
    zip.file(`logopedia-${slug}${eko ? "-eko" : ""}.pdf`, bytes);
  }

  const zipBytes = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 6 } });

  return new NextResponse(zipBytes as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="logopedia-pakiet-${slugs.length}.zip"`,
      "Content-Length": String(zipBytes.length),
      "Cache-Control": "no-store",
    },
  });
}
