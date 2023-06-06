import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(AuthGuard("jwt"))
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Post()
	async create(
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return this.usersService.create(username, password);
	} // TODO: Add validation & hashing

	@UseGuards(AuthGuard("jwt"))
	@Get(":id")
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Get("group/:group")
	findGroup(@Param('group') group: string) {
		return this.usersService.findGroup(group);
	}

	@UseGuards(AuthGuard("jwt"))
	@Get("groups/list")
	groups() {
		return this.usersService.findGroups();
	}

	@UseGuards(AuthGuard("jwt"))
	@Put("upvote/:id")
	upvote(@Param('id') id: string) {
		return this.usersService.upvote(id);
	}
}
