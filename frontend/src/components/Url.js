import PropTypes from "prop-types";

const Url = ({ address }) => {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <a onClick={handleClick} href={address}>
      {address}
    </a>
  );
};

Url.propTypes = {
  address: PropTypes.string.isRequired,
};
export default Url;
