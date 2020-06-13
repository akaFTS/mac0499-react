import React, { Component } from 'react';
import StudentGenders from '../components/students/StudentGenders';
import StudentLocations from '../components/students/StudentLocations';
import StudentJobs from '../components/students/StudentJobs';
import StudentEducations from '../components/students/StudentEducations';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelection: 0,
    };
  }

  selectEpoch = (epoch) => this.setState({ currentSelection: epoch });

  render() {
    const { currentSelection } = this.state;
    return (
      <main>
        <div className="flex flex-wrap">
          <div className="w-100 w-50-l ph2">
            <StudentJobs
              currentSelection={currentSelection}
              onEpochSelected={this.selectEpoch}
            />
            <StudentEducations
              currentSelection={currentSelection}
              onEpochSelected={this.selectEpoch}
            />
          </div>
          <div className="w-100 w-50-l ph2">
            <StudentGenders
              currentSelection={currentSelection}
              onEpochSelected={this.selectEpoch}
            />
            <StudentLocations
              currentSelection={currentSelection}
              onEpochSelected={this.selectEpoch}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Students;