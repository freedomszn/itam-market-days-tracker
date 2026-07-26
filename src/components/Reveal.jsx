import { useInView } from "../hooks/useInView";

export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [setNode, visible] = useInView();

  return (
    <Tag
      ref={setNode}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
