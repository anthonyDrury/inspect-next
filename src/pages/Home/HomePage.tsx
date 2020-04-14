import React from "react";
import CityInput from "../../components/CityInput/CityInput";
import {
  Typography,
  Grid,
  Divider,
  Container,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import orange from "@material-ui/core/colors/orange";
import yellow from "@material-ui/core/colors/yellow";
import WavyBorder from "../../components/WavyBorder/WavyBorder";
import SettingsModal from "../../components/SettingsModal/SettingsModal";

// displays the five day forecast
function HomePage(): JSX.Element {
  return (
    <div className="in-home">
      <Container
        maxWidth={false}
        style={{ backgroundColor: yellow[500], padding: "0.5rem 0" }}
      >
        <Typography variant="h1" component="h1">
          Inspect Next
        </Typography>
        <Typography variant="h2" component="h2">
          Built by a beekeeper, for beekeepers
        </Typography>
        <Typography component="p">
          Wondering when the best weather conditions to inspect your beehive
          will be?
        </Typography>
        <Card
          style={{
            display: "inline-block",
            backgroundColor: orange[500],
            marginTop: "0.5rem",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h5">
              Wonder no more.
            </Typography>
          </CardContent>
          <CardActions>
            <CityInput
              open={true}
              style={{
                margin: "0 auto",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
              }}
            />
          </CardActions>
        </Card>
      </Container>
      <Divider style={{ backgroundColor: "black" }}></Divider>
      <WavyBorder></WavyBorder>
      <Container maxWidth={false} style={{ backgroundColor: yellow[500] }}>
        <Typography variant="h3" component="h3">
          Easily determine which days will have the best conditions.
        </Typography>

        <Card
          style={{
            display: "inline-block",
            backgroundColor: yellow[600],
            marginTop: "0.5rem",
          }}
        >
          <CardContent>
            <Grid container wrap="wrap" justify="center">
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={6}
                sm={4}
              >
                <Typography variant="h6" component="h6">
                  Optimal conditions
                </Typography>
                <FontAwesomeIcon size="5x" color="green" icon={faCheckCircle} />
                <Typography component="p">
                  Best time to inspect, aim for these times.
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={6}
                sm={4}
              >
                <Typography variant="h6" component="h6">
                  Viable conditions
                </Typography>
                <FontAwesomeIcon size="5x" color="black" icon={faCheckCircle} />
                <Typography component="p">
                  Not optimal, but can inspect if you need to.
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={6}
                sm={4}
              >
                <Typography variant="h6" component="h6">
                  Inadvisable conditions
                </Typography>
                <FontAwesomeIcon color="red" size="5x" icon={faTimesCircle} />
                <Typography component="p">
                  Possible adverse effects and damage to hive health.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <div
        style={{
          backgroundColor: orange[500],
          height: "2rem",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
        }}
      />
      <Container
        maxWidth={false}
        style={{ backgroundColor: yellow[500], padding: "0.5rem 0" }}
      >
        <Typography variant="h5" component="h5">
          Customizable, so you have full control over whether conditions are
          optimal or not.
        </Typography>
        <Card
          style={{
            display: "inline-block",
            backgroundColor: yellow[600],
            marginTop: "0.5rem",
          }}
        >
          <CardContent>
            <Typography component="p">
              "Ask two beekeepers the same question <br /> and you will get
              three answers."
            </Typography>
          </CardContent>
          <CardActions>
            <SettingsModal
              size="5x"
              style={{
                margin: "0 auto",
                border: "1px solid black",
                borderRadius: "4px",
              }}
            />
          </CardActions>
          <CardContent>
            <Typography component="p">
              Choose your own settings, since you know best.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default HomePage;
