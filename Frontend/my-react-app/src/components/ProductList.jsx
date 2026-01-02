export default function ProductList({ products }) {
  return (
    <div>
      <h3>Available Products</h3>
       <div className="product-container">
      {products.map(p => (
        <div className="product" key={p.id}>
          <img src={p.imageUrl} alt='product' className="product-image" />
          {p.name} - ${p.price}
        </div>
        
      ))}</div>
    </div>
  );
}
