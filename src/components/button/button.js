export default function Button({ props }) {
  const { text, width, height, callback } = props;
  return (
    <button
      type="button"
      className="btn btn-primary btn-lg"
      style={{
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem",
        width: width,
        height: height,
      }}
      onClick={callback()}
    >
      {text}
    </button>
  );
}
