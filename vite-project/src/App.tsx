import { Box, Button, Alert, Snackbar, Slide, Typography } from "@mui/material";
// import { TransitionProps } from "@material-ui/core/transitions";
import "./App.css";
import React, { useEffect } from "react";

//type TransitionProps = Omit<SlideProps, "direction">;

//const [hoveredBox, setHoveredBox] = React.useState<number | null>(null);
const [boxNumber, setBoxNumber] = React.useState<number | null>(null);

interface AppProps {
  dayVar: string;
  monthVar: string;
  dateVar: string;
  timeVar: string;
  hoverTransition: string;
  // hoveredBox: Number;
}

// const getMargin = (boxNumber) => {
//    switch(boxNumber) {
//     case 1:
//       return '10px',
//    }
// }

// const boxing = () => {
//   if (hoveredBox == 0){
//     setBoxNumer(2)

//   }

//   if (hoveredBox == 1){
//     setBoxNumer(3)
//   }
// }

const getCurrentDateTime = () => {
  const now = new Date();
  return {
    day: now.toLocaleDateString(),
    month: now.toLocaleDateString("default", { month: "long" }),
    date: now.getDate(),
    time: now.toLocaleTimeString(),
  };
};

const typographyStyle = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 400,
  fontSize: "0.875rem",
  lineHeight: 1.43,
  letterSpacing: "0.01071em",
  justifyContent: "left !important",
};

const AlertContent: React.FC<{
  hoveredBox?: number;
  hoverTransition?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({ hoverTransition, onMouseEnter, onMouseLeave, hoveredBox }) => {
  let dynamicMarginTop = "";
  let dynamicMarginBottom = "";

  const [boxNumber, setBoxNumber] = React.useState<number | null>(null);

  useEffect(() => {
    if (hoveredBox === 0) {
      setBoxNumber(2);
    }

    if (hoveredBox === 1) {
      setBoxNumber(3);
    }
  }, [hoveredBox]);

  if (boxNumber === 2) {
    dynamicMarginTop = "57px";
    dynamicMarginBottom = "0px";
  }

  if (boxNumber === 3) {
    dynamicMarginTop = "57px";
    dynamicMarginBottom = "0px";
  }

  return (
    <div>
      <Alert
        sx={{
          width: "100%",

          boxShadow: " 0 2px 10px rgba(0, 0.3, 0, 0.3)",
          display: "flex-start !important",
          justifyContent: "left",
          justifyItems: "flex-start",
          alignItems: "flex-start !important",
          transition: `transform 0.3s ease-in-out 
        ${hoverTransition || ""}`,
          // opacity: index === 0 ? 1 : 0.8,
          // transform: `translateY(${index * 10}px)`,
          "&:hover": {
            transform: "scale(1.05)",
            // marginBottom: 0,
            marginTop: dynamicMarginTop,
            marginBottom: dynamicMarginBottom,
          },
          // marginBottom: 2,
          marginBottom:
            dynamicMarginBottom !== undefined ? -dynamicMarginBottom : 2,
          marginLeft: 2,
          zIndex: 0 ? 1 : 0,
        }}
        onMouseEnter={() => {
          // setIsHovered(true);
          if (onMouseEnter) onMouseEnter();
        }}
        onMouseLeave={() => {
          // setIsHovered(false);
          if (onMouseLeave) onMouseLeave();
        }}
      >
        <Typography sx={typographyStyle}>Event has been created!</Typography>
        <Typography sx={typographyStyle}>
          {getCurrentDateTime().day}, {getCurrentDateTime().month},{" "}
          {getCurrentDateTime().date} at {getCurrentDateTime().time}
        </Typography>
      </Alert>
    </div>
  );
};

function App({
  dayVar,
  monthVar,
  dateVar,
  timeVar,
  hoverTransition,
}: AppProps): JSX.Element {
  const [hoveredBox, setHoveredBox] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    // setTransition(() => true);
    setOpen(true);
  };

  const getDynamicMargin = (boxNumber: number): number => {
    if (hoveredBox === boxNumber) {
      return boxNumber === 0 ? 0 : 27 * (boxNumber - 1);
    }
    return 0;
  };
  // boxnumber 1,2,3 if hoveredbox = boxnumber

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Button onClick={handleClick}>Create Event</Button>
        <Snackbar
          open={open}
          // autoHideDuration={6000}
          TransitionComponent={(props) => <Slide {...props} direction="up" />}
          onClose={handleClose}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              marginBottom: 2,
            }}
          >
            <Alert
              severity="success"
              sx={{
                width: "100%",
                marginBottom: 2,
                boxShadow: " 0 2px 10px rgba(0, 0.3, 0, 0.3)",
                alignItems: "center",
                height: "56px",
                transition: "transform 0.5s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  marginBottom: getDynamicMargin(1),
                },
                zIndex: boxNumber === 1 ? 1 : 0,
              }}
              onMouseEnter={() => setBoxNumber(1)}
              onMouseLeave={() => setHoveredBox(null)}
            >
              Event has been created!
            </Alert>

            <AlertContent hoverTransition="0.5s ease-in-out" hoveredBox={0} />

            <AlertContent hoverTransition="0.8s ease-in-out" hoveredBox={1} />
          </Box>
        </Snackbar>
      </Box>
    </div>
  );
}

export default App;
