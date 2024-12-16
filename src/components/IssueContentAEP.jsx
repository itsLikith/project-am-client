const IssueContentAEP = (props) => {
  return (
    <div>
      {props.selected === 'aep' ? (
        <>
          <span className="h6 text-info">This is for AEP Issue</span>
          <form action="" className="container-fluid p-4">
            <div className="row">
              <div class="col-md-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="Enter AEP number"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="Enter employee name"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="Enter employee ID"
                  required
                />
              </div>
              <div className="row">
                <div class="col-md-12 mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter employee department"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter valid areas"
                  ></textarea>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center">
              <input type="submit" className="btn btn-success" />
            </p>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default IssueContentAEP;
