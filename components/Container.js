export default function Container({ className, children, ...props }) {
  return (
    <div className={`mx-auto flex flex-col max-w-5xl ${className}`} {...props}>
      {children}
    </div>
  );
}
