import { NextRequest, NextResponse } from "next/server";
import { render } from "takumi-pdf/next";
import { templates, type TemplateSlug } from "@/lib/pdf/templates";
import React from "react";

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

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!(slug in templates)) {
    return NextResponse.json({ error: "Unknown template", available: Object.keys(templates) }, { status: 404 });
  }

  const tpl = templates[slug as TemplateSlug];
  const url = new URL(req.url);
  const name = url.searchParams.get("name") || undefined;
  const date = url.searchParams.get("date") || undefined;
  const eko = url.searchParams.get("eko") === "1" || url.searchParams.get("eko") === "true";
  const qrParam = url.searchParams.get("qr") || "https://sklep.logopedia.pl";

  // Generate QR for katalog
  let qrDataUrl: string | undefined = undefined;
  if (slug === "katalog") {
    try {
      const QRCode = await import("qrcode");
      qrDataUrl = await QRCode.toDataURL(qrParam, { width: 200, margin: 1, color: { dark: "#1A1A2E", light: "#FFFFFF" } });
    } catch {}
  }

  const props: Record<string, unknown> = { name, date, eko };
  if (qrDataUrl) props.qr = qrDataUrl;

  const rawElement = (tpl.component as (p?: Record<string, unknown>) => React.ReactElement)(props);
  const element = stripEmojisFromNode(rawElement) as React.ReactElement;

  let fonts: unknown = undefined;
  try {
    const { kidFonts } = await import("@/lib/pdf/fonts");
    fonts = await kidFonts();
  } catch {
    fonts = undefined;
  }

  try {
    const pdf = await render(element as never, {
      size: "a4",
      margin: 0,
      fonts: fonts as never,
    });

    const filename = `logopedia-${slug}${name ? `-${name}` : ""}${eko ? "-eko" : ""}.pdf`;
    return new NextResponse(pdf as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": String((pdf as Uint8Array).length),
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("PDF render error", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
