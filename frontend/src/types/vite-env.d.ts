/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_AUTO_UPDATE_SERVER_URL: string;
	readonly VITE_SPREADSHEET_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
