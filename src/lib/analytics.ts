
export function recordTemplateView(templateId: string): number {
  if (typeof window === "undefined" || !templateId) return 0;
  try {
    const key = "wh_template_views";
    const raw = localStorage.getItem(key);
    const views: Record<string, number> = raw ? JSON.parse(raw) : {};
    
    const current = views[templateId] || 0;
    const next = current + 1;
    views[templateId] = next;
    
    localStorage.setItem(key, JSON.stringify(views));
    window.dispatchEvent(
      new CustomEvent("wh:template_viewed", {
        detail: { templateId, count: next },
      })
    );
    return next;
  } catch (e) {
    return 0;
  }
}

export function getTemplateViews(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("wh_template_views");
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function formatViewCount(count: number): string {
  if (!count || count <= 0) return "0x";
  if (count >= 1000) {
    return `${(count / 1000).toLocaleString("id-ID", { maximumFractionDigits: 1 })}k`;
  }
  return `${count}x`;
}
