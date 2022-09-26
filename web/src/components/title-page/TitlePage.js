function TitlePage ({ message, className, icon, children }) {
  return (
    <section className={className}>
      <h1 className='m-0 fs-3 fw-light'>
        {icon && <i className={`fa fa-${icon} me-1`} />}
        {message}
      </h1>
      <hr className='mt-0'/>
      {children}
    </section>
  );
}

TitlePage.defaultProps = {
  className: '',
  icon: undefined
}

export default TitlePage;