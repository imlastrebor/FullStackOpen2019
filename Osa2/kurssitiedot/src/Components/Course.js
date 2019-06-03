import React from "react";

const Header = ({ header }) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const parts = parts => {
  return parts.map(onePart => {
    return (
      <Part
        key={onePart.id}
        name={onePart.name}
        exercises={onePart.exercises}
      />
    );
  });
};

const Content = ({ course }) => {
  const courses = course.map(oneCourse => {
    return (
      <div key={oneCourse.id}>
        <h2>{oneCourse.name}</h2>
        <>{parts(oneCourse.parts)}</>
      </div>
    );
  });

  return <div>{courses}</div>;
};

const Total = ({ course }) => {
  let exercisesAll = course.map(course => {
    return course.parts.map(parts => {
      return parts.exercises;
    });
  });

  let flatExercises = exercisesAll.flat();

  const totalCount = () => flatExercises.reduce((acc, cur) => acc + cur);

  return (
    <div>
      <p>yhteensä {totalCount()} kurssia</p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header header={"Opetusohjelma"} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
