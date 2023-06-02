
function About() {
    return (
      // <div className='flex h-full flex-col justify-center items-center'>
      //   <h1 className="text-2xl mb-5 font-bold bg-primary">About</h1>
      //   <span className='text-7xl'>💬</span>
      // </div>
      <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Our services</h1>
        <p className="text-lg text-center mb-12">
          Here you can see all the amazing services that we provide.
        </p>
        <div className="flex flex-wrap justify-center mx-10">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Online booking</h2>
              <p className="text-gray-100 leading-loose">
                Book your appointments online and save time waiting in line.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Best doctors</h2>
              <p className="text-gray-100 leading-loose">
                Our network of doctors includes the best specialists in every field.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-gradient-to-br from-green-400 to-teal-600 rounded-lg p-6 flex-1">
              <h2 className="text-2xl font-bold mb-4 text-white">Lab results in one place</h2>
              <p className="text-gray-100 leading-loose">
                View all your lab results in one convenient location.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-500 to-red-500 rounded-lg p-6 flex-1">
              <h2 className="text-2xl font-bold mb-4 text-white">Realtime chat with your doctor</h2>
              <p className="text-gray-100 leading-loose">
              Chat with your doctor in real-time and get answers to your medical
            questions quickly.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg p-6 flex-1">
              <h2 className="text-2xl font-bold mb-4 text-white">Personalized treatment plans</h2>
              <p className="text-gray-100 leading-loose">
              Our team of experienced doctors will work with you to create a personalized
    treatment plan that meets your specific needs and goals.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Mobile access</h2>
              <p className="text-gray-100 leading-loose">
              Access all our services on-the-go with our mobile app, available on
            both iOS and Android.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  export default About;
