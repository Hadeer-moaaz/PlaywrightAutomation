import { test, expect } from '@playwright/test';


    const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'
    // ── Credentials ────────────────────────────────────────────────────────────────
    const emailText = 'hadeer@gmail.com';
    const passText = 'ModyMM@2020';

test('E2E scenario with data', async({page})=>
{

    const email = page.getByPlaceholder('you@email.com');
    const password = page.getByLabel('password');
    const signInBtn = page.getByRole('button', {name: 'Sign In'}).last();
    const eventsTab = page.locator('#nav-events');
    const addNewEvenetBtn = page.getByText('Add New Event');
    const titlelocator = page.locator('#event-title-input');
    const titleText = 'Amr Diab';
    const desc = page.getByPlaceholder('Describe the event…');
    const categoryDropDown = page.getByLabel('category');
    const city = page.getByLabel('city');
    const venue = page.getByLabel('venue');
    const eventDateTime = page.getByRole('textbox', { name: 'Event Date & Time*' });
    const price = page.getByPlaceholder('0.00');
    const totalSeats = page.getByPlaceholder('e.g. 500');
    const addEventBtn = page.getByText('Add Event');
    const successmsg = page.getByText('Event created!');
    const eventCards = page.getByTestId('event-card');
    const ticketCountByD = page.locator('#ticket-count');
    const firstname = page.getByLabel('Full Name');
    const email2 = page.locator('#customer-email');
    const phone = page.getByPlaceholder('+91 98765 43210');
    const confirmBtn = page.locator('.confirm-booking-btn');
    const bookingRefEl = page.locator('.booking-ref').first();
    const ViewMyBookings = page.getByRole('button', {name: 'View My Bookings'});
    const allBookingCards = page.locator('#booking-card');

   
   
   
    await page.goto(`${BASE_URL}/login`);
    await email.fill(emailText);
    await password.fill(passText);
    await signInBtn.click();
    await eventsTab.click();
    await addNewEvenetBtn.click();
    await titlelocator.fill(titleText);
    await desc.fill('Amr Diab concert in Pyramides on 17th AUG at 20:00');
    await categoryDropDown.selectOption('Concert');
    await city.fill('Pyramides');
    await venue.fill('11');
    await eventDateTime.fill('2026-08-17T20:00');
    await price.fill('5000');
    await totalSeats.fill('1000');
    await addEventBtn.click();
    await expect(successmsg).toBeVisible();
    await page.locator('#nav-events').click(); 
    await expect(eventCards.first()).toBeVisible();
    const targetCard = eventCards.filter({hasText: titleText}).first();
    await expect(targetCard).toBeVisible();
    const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
    console.log(`Seats before booking: ${seatsBeforeBooking}`);
    await targetCard.getByTestId('book-now-btn').click();
    await expect(ticketCountByD).toHaveText('1');
    await firstname.fill('Sara');
    await email2.fill('Sara33@email.com');
    await phone.fill('+9145321674433');
    await confirmBtn.click();
    await expect(bookingRefEl).toBeVisible();
    const bookingRef = (await bookingRefEl.innerText()).trim();
    expect(bookingRef.charAt(0)).toBe(titleText.trim().charAt(0).toUpperCase());
    console.log(bookingRef);
    await ViewMyBookings.click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    console.log(page.url());
    await expect(allBookingCards.first()).toBeVisible();
    const matchingCard  = allBookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef })});
    await expect(matchingCard).toBeVisible();
    await expect(matchingCard).toContainText(titleText);
    await page.reload();
    await page.locator('#nav-events').click(); 
    await expect(eventCards.first()).toBeVisible();
    const updatedCard = eventCards.filter({hasText: titleText}).first();
    await expect(updatedCard).toBeVisible();
    const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().innerText());
    console.log(`Seats after booking: ${seatsAfterBooking}`);
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);


});