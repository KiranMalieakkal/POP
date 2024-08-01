// Description: This component is used to display available choices in forms.
// It takes in a list of options that will be displayed (for example: EUR, SEK, USD).
// It also takes in a name variable which is used to set a useState variable by identifying it by name

type Props = {
  items: string[];
  name: string;
  pickItemFunction: (name: string, value: string) => void;
};

function FormChoices(props: Props) {
  // The function handleClick needs to exist because it needs to access the event because it needs to stop propagation
  // Without it, the form would try to submit when pressing one of the buttons in here.
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: string
  ) => {
    event.preventDefault(); // Prevent form submission
    props.pickItemFunction(props.name, item);

    // Blur the currently focused field
    // This provides a nicer behaviour. Try commenting this out and see how much worse it is.
    const activeElement = document.activeElement as HTMLElement;
    activeElement?.blur();
  };

  return (
    <>
      <div className="absolute w-full max-h-32 overflow-y-auto rounded bg-gray-100 pr-2">
        {props.items.map((item, index) => (
          <button
            key={index}
            className="w-full text-left rounded bg-gray-100 hover:bg-gray-200 p-2 m-1"
            onMouseDown={(event) => handleClick(event, item)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}
export default FormChoices;
