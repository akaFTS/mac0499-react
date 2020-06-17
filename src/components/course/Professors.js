import React, { useState } from 'react';
import ContentBox from '../shared/ContentBox';
import ProfessorBubble from './ProfessorBubble';
import ProfessorCanvas from './ProfessorCanvas';
import YearPicker from '../shared/YearPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faStarHalf,
  faCircle,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import professors from '../../data/course/professors.json';
import * as years from '../../data/professors/importYears.js';

function getCanvasSize(professors, level) {
  const capacity = Object.keys(professors).filter(
    (code) => professors[code] === level
  ).length;

  return capacity <= 6
    ? 1
    : capacity <= 11
    ? 2
    : capacity <= 17
    ? 3
    : capacity <= 22
    ? 4
    : 5;
}

function getProfessorsList(professors, level) {
  return Object.keys(professors)
    .filter((code) => professors[code] === level)
    .join(' ');
}

function allCanvasSizes(professors) {
  const canvasSizes = [];
  for (let i = 0; i <= 6; i++) {
    if (i === 4) {
      canvasSizes.push(0);
      continue;
    }
    canvasSizes.push(getCanvasSize(professors, i));
  }
  return canvasSizes;
}

export default function Professors() {
  const [currentYear, setCurrentYear] = useState(null);

  const professorYears = [];
  Object.keys(years).forEach((key) => {
    professorYears.push({
      year: parseInt(key.replace('p', '')),
      professors: years[key],
    });
  });

  const currentProfessorYear = professorYears.find(
    (profYear) => profYear.year === currentYear
  );

  const currentProfessors =
    (currentProfessorYear && currentProfessorYear.professors) || {};

  const groupedProfessors = Object.keys(currentProfessors).reduce(
    (acc, cur) =>
      acc[currentProfessors[cur]]
        ? {
            ...acc,
            [currentProfessors[cur]]: [...acc[currentProfessors[cur]], cur],
          }
        : { ...acc, [currentProfessors[cur]]: [cur] },
    {}
  );

  Object.keys(groupedProfessors).map((level) =>
    groupedProfessors[level].sort((a, b) => (a > b ? 1 : -1))
  );

  return (
    <ContentBox title="Professores" color="purple">
      <YearPicker onYearChanged={setCurrentYear} />
      <div className="relative mt4">
        <ProfessorCanvas
          title="Titular"
          color="dark-red"
          icon={
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon
                icon={faStar}
                transform="shrink-8 left-6 down-5"
              />
              <FontAwesomeIcon icon={faStar} transform="shrink-4 up-4" />
              <FontAwesomeIcon
                icon={faStar}
                transform="shrink-8 right-6 down-5"
              />
            </span>
          }
          size={getCanvasSize(currentProfessors, 6)}
          professorsList={getProfessorsList(currentProfessors, 6)}
        />
        <ProfessorCanvas
          title="Associado"
          color="orange"
          icon={
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon
                icon={faStar}
                transform="shrink-6 left-4 down-4"
              />
              <FontAwesomeIcon
                icon={faStar}
                transform="shrink-6 right-4 up-4"
              />
            </span>
          }
          size={getCanvasSize(currentProfessors, 5)}
          professorsList={getProfessorsList(currentProfessors, 5)}
        />
        <ProfessorCanvas
          title="Doutor"
          color="gold"
          icon={<FontAwesomeIcon icon={faStar} transform="shrink-3" />}
          size={getCanvasSize(currentProfessors, 3)}
          professorsList={getProfessorsList(currentProfessors, 3)}
        />
        <ProfessorCanvas
          title="Assistente"
          color="mt-light-green"
          icon={
            <FontAwesomeIcon icon={faStarHalf} transform="right-3 shrink-3" />
          }
          size={getCanvasSize(currentProfessors, 2)}
          professorsList={getProfessorsList(currentProfessors, 2)}
        />
        <ProfessorCanvas
          title="Auxiliar"
          color="light-blue"
          icon={<FontAwesomeIcon icon={faCircle} transform="shrink-7" />}
          size={getCanvasSize(currentProfessors, 1)}
          professorsList={getProfessorsList(currentProfessors, 1)}
        />
        <ProfessorCanvas
          title="Sênior"
          color="light-silver"
          icon={<FontAwesomeIcon icon={faMoon} transform="shrink-3" />}
          size={getCanvasSize(currentProfessors, 0)}
        />
        {professors.map((professor) => (
          <ProfessorBubble
            name={professor.name}
            code={professor.code}
            key={professor.code}
            level={currentProfessors[professor.code]}
            professorSchema={groupedProfessors}
            canvasSizes={allCanvasSizes(currentProfessors)}
          />
        ))}
      </div>
    </ContentBox>
  );
}
