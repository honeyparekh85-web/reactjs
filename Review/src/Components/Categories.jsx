export default function Categories({ setSelectedCategory }) {
  const data = [
    {
      title: "Indoor Plants",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFe0Qdpb1O-JLpr4Q-pTD7Hgf_8XUeqUxQGw&s",
      category: "indoor",
    },
    {
      title: "Outdoor Plants",
      img: "https://potsplantersandmore.com/product_images/uploaded_images/outdoor-potted-plants.jpg",
      category: "outdoor",
    },
    {
      title: "Pots",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeAI-oyf1zfQtu9OUCq3x0nXCbEPF2eLuC7g&s",
    },
  ];

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="categories">
      {data.map((item, index) => (
        <div
          key={index}
          className="category-card"
          style={{ backgroundImage: `url(${item.img})` }}
          onClick={() => handleClick(item.category)}
        >
          <h2>{item.title}</h2>
        </div>
      ))}
    </section>
  );
}