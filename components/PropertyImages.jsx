import Image from 'next/image';

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="conatiner mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.slice(1).map((image, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src={image}
                  alt=""
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
