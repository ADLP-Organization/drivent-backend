import { cleanDb, generateValidToken } from "../helpers";
import activitiesService from "@/services/activities-service";
import { init } from "@/app";
import {
  createEnrollmentWithAddress,
  createPayment,
  createTicket,
  createTicketTypeRemote,
  createUser
} from "../factories";
import httpStatus from "http-status";
import { TicketStatus } from "@prisma/client";
import faker from "@faker-js/faker";

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

describe("GET /days", () => {
  it("should respond with status 200 and the list of days ", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeRemote();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const payment = await createPayment(ticket.id, ticketType.price);

    const fakerDay = {
      id: faker.datatype.number(),
      eventId: faker.datatype.number(),
      date: faker.datatype.datetime(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime()
    };

    jest.spyOn(activitiesService, "eventDays").mockImplementationOnce( (): any => {
      return [fakerDay];
    });

    const response= await activitiesService.eventDays(user.id);

    expect(response[0].id).toBe(fakerDay.id);
    expect(response[0].eventId).toBe(fakerDay.eventId);
    expect(response[0].date).toBe(fakerDay.date);
    expect(response[0].createdAt).toBe(fakerDay.createdAt);
    expect(response[0].updatedAt).toBe(fakerDay.updatedAt);
  });
});

