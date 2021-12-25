export default function Container({ className, children, ...props }) {
  return (
    <div className={`mx-auto flex flex-col max-w-5xl md:px-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
