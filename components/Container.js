
export default function Container({children, ...props}) {
  return (
    <div className="mx-auto flex flex-col max-w-5xl" {...props}>{children}</div>
  )
}