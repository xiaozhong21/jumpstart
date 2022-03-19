// import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => (
  <ul
    style={{
      margin: "auto 0",
      backgroundColor: "#00807b",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      listStyle: "none",
      gap: "30px",
    }}
  >
    <li>
      <a href="https://github.com/xiaozhong21" target="_blank" rel="noreferrer">
        <GitHubIcon sx={{ color: "white" }} />
      </a>
    </li>
    <li>
      <a
        href="https://www.linkedin.com/in/xiaozhong/"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedInIcon sx={{ color: "white" }} />
      </a>
    </li>
  </ul>
);

export default Footer;
