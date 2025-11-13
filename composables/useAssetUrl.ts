import { useRuntimeConfig } from '#imports';
import { withBase } from 'ufo';

const absoluteProtocolRegex = /^([a-z]+:)?\/\//i;
const dataUriRegex = /^data:/i;

export const useAssetUrl = () => {
  const config = useRuntimeConfig();
  const base = config.app?.baseURL || '/';

  return (path?: string | null) => {
    if (!path) {
      return '';
    }

    if (absoluteProtocolRegex.test(path) || dataUriRegex.test(path)) {
      return path;
    }

    const normalized = path.startsWith('/') ? path : `/${path}`;
    return withBase(normalized, base);
  };
};
