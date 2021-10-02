/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_AUTO_UPDATE_SERVER_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
