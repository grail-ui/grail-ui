export function formatHtml(str: string): string {
	if (!str) return '';
	return (
		str
			// Escape HTML tags
			.replace(
				/[&<>'"]/g,
				(tag) =>
					({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
			)
			// Replace backticks as <code>
			.replace(/`(.*?)`/g, '<code>$1</code>')
	);
}
