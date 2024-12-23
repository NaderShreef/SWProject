export default function about(){
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
          <header className="bg-blue-600 text-white py-4">
            <h1 className="text-center text-3xl font-bold">About E-Learning App</h1>
          </header>
    
          <main className="flex-grow p-6">
            <section className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                The E-Learning App is dedicated to providing accessible, high-quality education to learners around the world. We believe in the power of technology to bridge gaps in education and create opportunities for lifelong learning.
              </p>
    
              <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>A wide range of courses across various disciplines</li>
                <li>Interactive quizzes and assessments</li>
                <li>Progress tracking and personalized recommendations</li>
                <li>Expert instructors and community support</li>
              </ul>
    
              <h2 className="text-2xl font-bold mb-4">Join Us</h2>
              <p className="text-gray-700">
                Whether you are looking to upskill, explore a new hobby, or advance your career, the E-Learning App is here to support your journey. Start learning today and unlock your potential!
              </p>
            </section>
          </main>
    
          <footer className="bg-gray-800 text-white py-4">
            <p className="text-center">&copy; 2024 E-Learning App. All rights reserved.</p>
          </footer>
        </div>
      );
}