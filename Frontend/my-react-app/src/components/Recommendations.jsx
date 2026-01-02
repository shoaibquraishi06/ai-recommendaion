export default function Recommendations({ data }) {
  if (!Array.isArray(data)) {
    return <p>No recommendations yet</p>;
  }

  return (
    <div>
      <h3>Recommended Products</h3>
           <div className="product-recomented">

      {data.map((item, index) => (
        <div className="recommeded" key={index}>
          {item.name} - ${item.price}
        </div>
      ))}</div>
    </div>
  );
}
