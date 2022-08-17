module.export = {
  progressMeter: class ProgressMeter {
    constructor() {}

    loadFromJSON = (jsonString) => {this.loadFromObj(JSON.parse(jsonString))};

    loadFromObj = (obj) => {this = {...obj}};

    convertToJSON = () => {return JSON.stringify(this)}
  }
};
