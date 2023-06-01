import CustomButton from "@/components/CustomButton";

function Contact() {
  const developers = [
    {
      name: "Andriy Bobchuk",
      position: "Front-end Developer",
      avatarUrl: "/images/andriy.jpg",
      githubUrl: "https://github.com/andriybobchuk",
    },
    {
      name: "Asser Moustafa",
      position: "Architect & full-stack developer",
      avatarUrl: "/images/asser.jpg",
      githubUrl: "https://github.com/AsserElfeki",
    },
    {
      name: "Youssef Al Bali",
      position: "Full-stack Developer",
      avatarUrl: "/images/youssef.png",
      githubUrl: "https://github.com/youssefalb",
    },
    {
      name: "Michał Smaluch",
      position: "Back-end Developer",
      avatarUrl: "/images/michal.jpg",
      githubUrl: "https://github.com/drago20013",
    },
    {
      name: "VIktor Didyk",
      position: "Back-end Developer",
      avatarUrl: "/images/viktor.jpg",
      githubUrl: "https://github.com/claude-perrin",
    },
    {
      name: "Melanie Casimiro",
      position: "Front-end Developer",
      avatarUrl: "/images/melanie.jpg",
      githubUrl: "https://github.com/melaniecasimiro",
    },
  ];
  
  function  handleGitHubButtonClick(githubUrl: string) {
    window.open(githubUrl, '_blank');
  }

    return (
      <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-2 mt-1">Our development team</h1>
        <p className="text-lg text-center mb-12">
          Best of the best.
        </p>
    <div className="grid grid-cols-3 gap-4 m-10">
      {developers.map((developer) => (
        <div key={developer.name} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center p-10">
          <img src={developer.avatarUrl} alt={developer.name} className="w-32 h-32 rounded-full mb-4 object-cover" />
          <h2 className="text-lg font-bold mb-2">{developer.name}</h2>
          <p className="text-gray-500 mb-4">{developer.position}</p>
          <CustomButton
                buttonText="View on GitHub"
                onClick={() => handleGitHubButtonClick(developer.githubUrl)}
              />
        </div>
      ))}
    </div>
    </div>
    </div>
    );
  }

  export default Contact;
