export default function AboutPage() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold md:text-3xl">About RG Blogs</h1>
          <p className="text-gray-400 border p-2 lg:p-4 rounded-tl-xl rounded-br-xl border-teal-500">
            Welcome to RG Blogs, your go-to destination for insightful and
            engaging content on programming, software engineering, and
            cutting-edge developments in science and technology.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold md:text-3xl">Who Am I?</h1>
          <p className="text-gray-400 border p-2 lg:p-4 rounded-tl-xl rounded-br-xl border-teal-500">
            I'm Rodel Gabriel, a passionate enthusiast in the realms of
            programming and web developing. With years of experience in these
            fields, I aim to share my knowledge, experiences, and discoveries
            with you through this platform.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold md:text-3xl">Why This Blog?</h1>
          <p className="text-gray-400 border p-2 lg:p-4 rounded-tl-xl rounded-br-xl border-teal-500">
            This blog was born out of my desire to create a space where
            individuals with a passion for programming, software engineering,
            and the wonders of science and technology can come together to
            learn, discuss, and explore. It's not just about sharing knowledge;
            it's about fostering a community of like-minded individuals who are
            eager to stay updated and inspired by the ever-evolving world of
            technology.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold md:text-3xl">
            Connect With Me?
          </h1>
          <p className="text-gray-400 border p-2 lg:p-4 rounded-tl-xl rounded-br-xl border-teal-500">
            Stay updated on the latest posts, discussions, and announcements by
            connecting with me on social media platforms such as Twitter,
            LinkedIn, and GitHub. Feel free to reach out with any questions,
            suggestions, or collaboration opportunities. I look forward to
            connecting with you! Thank you for visiting RG Blogs. Let's embark
            on this journey of exploration and innovation together!
          </p>
        </div>
      </div>
    </div>
  );
}
