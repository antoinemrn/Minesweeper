import express, { Express } from "express";
import { Server } from "http";
import Game from "./models/Game";

interface RevealCellQueryParams {
  x: number;
  y: number;
}
interface NewGridQueryParams {
  w: number;
  h: number;
  b: number;
}

class WebServer {
  app: Express = express();
  server: Server;
  port: number = 3001;
  game: Game;
  constructor() {
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      );
      next();
    });
    this.app.get("/game/grid/", (req, res) => {
      const { w, h, b } = req.query as unknown as NewGridQueryParams;
      this.game = new Game(w, h, b);
      const response = { id: this.game.id, grid: this.game.grid };
      res.status(200).json(response);
    });

    this.app.get("/game/reveal/", (req, res) => {
      const { x, y } = req.query as unknown as RevealCellQueryParams;
      this.game.reveal(+x,+y);
      const response = {
        id: this.game.id,
        grid: this.game.grid,
        win: this.game.win,
        lose: this.game.lose,
      };
      res.status(200).json(response);
    });
  }
  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server started listening on port ${this.port}`);
    });
  }
  stop() {
    this.server.close();
  }
}

export default WebServer;
