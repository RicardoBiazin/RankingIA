// Logo de cada empresa/IA nos visuais alternativos (modelos/). Os SVG ficam em src/logos/ (copiados
// para public/logos/) e vêm do pacote @lobehub/icons-static-svg (MIT; as marcas são de seus donos e
// aparecem só para identificar o modelo). Empresa sem logo aqui cai na inicial.

// nome da empresa (minúsculo, como vem das fontes) -> arquivo em src/logos/ (sem .svg)
export const LOGOS = {
  'openai': 'openai', 'google': 'gemini', '~google': 'gemini', 'alibaba': 'qwen', 'meta': 'meta', 'anthropic': 'claude',
  'mistral': 'mistral', 'nvidia': 'nvidia', 'z.ai': 'zai', 'tencent': 'hunyuan', 'deepseek': 'deepseek', '~deepseek': 'deepseek',
  'xai': 'grok', 'spacexai': 'xai', 'ibm': 'ibm', 'microsoft': 'microsoft', 'cohere': 'cohere', 'moonshot ai': 'kimi',
  'xiaomi': 'xiaomimimo', 'minimax': 'minimax', 'stepfun': 'stepfun', 'amazon': 'nova', 'allen institute for ai': 'ai2',
  'allenai': 'ai2', 'inclusionai': 'ling', 'upstage': 'upstage', 'baidu': 'wenxin', 'reflection': 'reflection',
  'liquid ai': 'liquid', 'bytedance': 'bytedance', 'ai21 labs': 'ai21', 'opengvlab': 'internlm', 'poolside': 'poolside',
  'llava': 'llava', 'lg ai research': 'lg', 'meituan': 'longcat', 'inception': 'inception', 'inception ai': 'inception',
  'arcee ai': 'arcee', 'reka ai': 'reka', 'databricks': 'dbrx', 'openchat': 'openchat', 'kwaikat': 'kwaikat', 'zeroone ai': 'zeroone',
};

/** Caminho do logo da empresa (`/logos/x.svg`) ou null. */
export const logoDe = (empresa) => {
  const arq = LOGOS[String(empresa ?? '').trim().toLowerCase()];
  return arq ? `/logos/${arq}.svg` : null;
};
