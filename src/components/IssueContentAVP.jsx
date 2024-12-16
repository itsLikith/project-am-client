// IssueContentAVP.js
const IssueContentAVP = (props) => {
  return (
    <div>
      {props.selected === 'avp' ? (
        <>
          <span className="h6 text-info">This is for AVP Issue</span>
          <br />
          <form action="" className="container-fluid p-4">
            <div className="row">
              <div class="col-md-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="Enter AVP number"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="Enter vehicle number"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="Enter vehicle type"
                  required
                />
              </div>
              <div className="row">
                <div class="col-md-12 mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter AEP number"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <div className="form-control">
                    <label htmlFor="">Enter renewal date: </label>
                    <input type="date" class="form-control" required />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div className="form-control">
                    <label htmlFor="">Enter expiry date: </label>
                    <input type="date" class="form-control" required />
                  </div>
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

export default IssueContentAVP;
