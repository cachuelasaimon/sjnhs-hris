import React from 'react';

interface EducationLevel {
  level: string;
  schoolName: string;
  educationDegree: string;
  periodFrom: string;
  periodTo: string;
  highestLevel: string;
  unitsEarned: string;
  yearGraduated: string;
  scholarshipHonors: string;
}

interface Props {
  data: EducationLevel[];
}

const EducationalForm: React.FC<Props> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>LEVEL</th>
          <th>NAME OF SCHOOL</th>
          <th>BASIC EDUCATION/DEGREE/COURSE</th>
          <th>PERIOD OF ATTENDANCE (From)</th>
          <th>PERIOD OF ATTENDANCE (To)</th>
          <th>HIGHEST LEVEL/UNITS EARNED (if not graduated)</th>
          <th>YEAR GRADUATED</th>
          <th>SCHOLARSHIP/ACADEMIC HONORS RECEIVED</th>
        </tr>
      </thead>
      <tbody>
        {data.map((level, index) => (
          <tr key={index}>
            <td>{level.level}</td>
            <td>{level.schoolName}</td>
            <td>{level.educationDegree}</td>
            <td>{level.periodFrom}</td>
            <td>{level.periodTo}</td>
            <td>{level.highestLevel}</td>
            <td>{level.unitsEarned}</td>
            <td>{level.yearGraduated}</td>
            <td>{level.scholarshipHonors}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EducationalForm;
