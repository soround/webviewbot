export class Helpers {
    formatDate = () => {
        return new Date()
            .toLocaleString("ru-RU")
            .replace(/[/\\?%*:|"<>]/g, "-");
    };
    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
}
