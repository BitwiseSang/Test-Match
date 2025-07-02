export default function TestCycleCard({ data }) {
  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <p>Slots: {data.slots}</p>
      <p>
        Status: <strong>{data.status}</strong>
      </p>
      <p>
        From {new Date(data.startDate).toLocaleDateString()} to{' '}
        {new Date(data.endDate).toLocaleDateString()}
      </p>
    </div>
  );
}
