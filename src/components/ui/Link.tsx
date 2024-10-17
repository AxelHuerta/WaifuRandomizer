type Props = {
  href: string | undefined;
};

function Link(props: Readonly<Props>) {
  const { href } = props;

  return (
    <a href={href} className="underline text-blue-500">
      {href}
    </a>
  );
}

export default Link;
