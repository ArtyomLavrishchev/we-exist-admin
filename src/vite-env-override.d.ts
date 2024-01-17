import { FC, SVGProps } from 'react';

declare module '*.svg' {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.json' {
  const content: JSON;
  export default content;
}

declare module '*.png' {
  export default '' as string;
}
declare module '*.jpg' {
  export default '' as string;
}
