export type UserProps = {
  name: string;
  description: string;
  interests: string[];
  socialMediaHandels?: {
    linkedIn?: string;
    youtube?: string;
    github?: string;
  };
};

const Card = ({
  name,
  description,
  socialMediaHandels,
  interests,
}: UserProps) => {
  return (
    <div>
      <section>{name}</section>
      <section>{description}</section>
      <section>
        {interests.map((smh, i) => (
          <p key={i}>{smh}</p>
        ))}
      </section>
      {socialMediaHandels?.github && (
        <>
          <a href={socialMediaHandels.github}>github</a>
          <br />
        </>
      )}
      {socialMediaHandels?.linkedIn && (
        <>
          <a href={socialMediaHandels.linkedIn}>linkedIn</a>
          <br />
        </>
      )}
      {socialMediaHandels?.youtube && (
        <a href={socialMediaHandels.youtube}>youtube</a>
      )}
    </div>
  );
};

export default Card;
