const STEPS = ['Type', 'Toppings', 'Address', 'Baking!'];

type ProgressProps = {
  current: number;
};

const Progress = ({ current }: ProgressProps) => (
  <div className="grid grid-cols-[repeat(4,_25%)]">
    {STEPS.map((step, index) => (
      <div
        key={step}
        style={{
          background: index < current ? 'lightblue' : 'white',
          color: index < current ? 'white' : 'lightblue',
          fontSize: '20pt',
          fontWeight: 'bold',
          borderBottom: '1px solid lightblue',
          textAlign: 'center',
        }}
      >
        {step}
      </div>
    ))}
  </div>
);

export default Progress;
