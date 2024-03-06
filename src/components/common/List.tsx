import { Spinner } from "./Spinner";

interface Config {
  label: string;
  value: string | undefined;
}

interface Props {
  config: Config[];
}

export default function List({ config }: Props) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {config.map(({ label, value }) => (
        <li className="flex justify-between gap-x-6 py-5" key={label}>
          <div>
            <p className="lg:text-lg md:text-sm text-xs font-semibold leading-6 text-gray-900 dark:text-white">
              {label}
            </p>
          </div>
          <div>
            <p className="lg:text-lg md:text-sm text-xs font-semibold leading-6 text-gray-900 dark:text-white">
              {value || <Spinner sm />}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
