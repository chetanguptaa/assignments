import "./App.css";
import Card, { UserProps } from "./components/Card";

const user: UserProps = {
  name: "chetan",
  description: "cool human being",
  interests: ["football", "coding"],
  socialMediaHandels: {
    github: "https://github.com/chetanguptaa",
    linkedIn: "https://www.linkedin.com/in/chetanguptaaa/",
  },
};

function App() {
  return (
    <div>
      <Card
        name={user.name}
        description={user.description}
        socialMediaHandels={user.socialMediaHandels}
        interests={user.interests}
      />
    </div>
  );
}

export default App;
