const SuccessAlert = (props) => {
  return (
    <div className="alert alert-success alert-dismissible fade show">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      {props.message}
    </div>
  );
};

export default SuccessAlert;
