import { test, expect } from '@playwright/test';

const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'
// ── Credentials ────────────────────────────────────────────────────────────────
const emailText = 'Amyyy@gmail.com';
const passText = 'Amir@5676';

// ── Helpers ────────────────────────────────────────────────────────────────────
async function loginAndGoToBooking(page) {

    const email = page.getByPlaceholder('you@email.com');
    const password = page.getByLabel('password');
    const signInBtn = page.getByRole('button', {name: 'Sign In'}).last();
    await page.goto(`${BASE_URL}/login`);
    await email.fill(emailText);
    await password.fill(passText);
    await signInBtn.click();
    await expect(page.getByRole("link", {name: "Browse Events →"})).toBeVisible();

}

// ── Test ───────────────────────────────────────────────────────────────────────
test.skip('Single ticket booking is eligible for refund', async({page})=>
{
 // ── Step 1: Log in ───────────────────────────────────────────────────────
 await loginAndGoToBooking(page);

 // ── Step 2: Book first event with 1 ticket (default) ────────────────────────────────
    const eventTab = page.getByTestId('nav-events');
    const firstname = page.getByLabel('Full Name');
    const email = page.locator('#customer-email');
    const phone = page.getByPlaceholder('+91 98765 43210');
    const confirmBtn = page.locator('.confirm-booking-btn');
    await eventTab.click();
    await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
    await firstname.fill('Luis Pedro');
    await email.fill('Luis@email.com');
    await phone.fill('+9145321674433');
    await confirmBtn.click();

 // ── Step 3: Navigate to booking detail ──────────────────────────────────────────────
    const ViewMyBookings = page.getByRole('button', {name: 'View My Bookings'});
    const viewDetailsBtn = page.getByRole("link", {name: "View Details"}).first();
    const cancelButton = page.getByRole("button", {name: "Cancel Booking"}).first();
    await ViewMyBookings.click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await viewDetailsBtn.click();
    await cancelButton.waitFor();
    await expect(page.getByText('Booking Information')).toBeVisible();

 // ── Step 4 — Validate booking ref ──────────────────────────────────────────────
    const bookingRF = (await page.locator('.font-mono').first().innerText()).trim();
    const eventTitle = (await page.getByRole('heading', {name: "Dilli Diwali Mela"}).innerText()).trim();
    expect(bookingRF[0]).toBe(eventTitle[0]);
    console.log(bookingRF);
    console.log(eventTitle);
    const checkRefundBtn = page.getByTestId('check-refund-btn');
    await checkRefundBtn.click();

 // ── Step 5 — Check refund eligibility ──────────────────────────────────────────────
    const snipper = page.locator('#refund-spinner');
    await expect(snipper).toBeVisible();
    await expect(snipper).not.toBeVisible({timeout: 6000});

 // ── Step 6 — Validate result ──────────────────────────────────────────────
    const refundResult = page.getByTestId('refund-result');
    await expect(refundResult).toBeVisible();
    await expect(refundResult).toContainText(" Single-ticket bookings qualify for a full refund.");

});


test.skip('Group ticket booking is NOT eligible for refund', async({page})=>
{
 // ── Step 1: Log in ───────────────────────────────────────────────────────
 await loginAndGoToBooking(page);

 // ── Step 2: Book first event with 1 ticket (default) ────────────────────────────────
    const eventTab = page.getByTestId('nav-events');
    const firstname = page.getByLabel('Full Name');
    const email = page.locator('#customer-email');
    const phone = page.getByPlaceholder('+91 98765 43210');
    const confirmBtn = page.locator('.confirm-booking-btn');
    const plusButton = page.getByRole('button', {name: '+'});

    await eventTab.click();
    await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
    await plusButton.dblclick();
    await firstname.fill('Luis Pedro');
    await email.fill('Luis@email.com');
    await phone.fill('+9145321674433');
    await confirmBtn.click();

 // ── Step 3: Navigate to booking detail ──────────────────────────────────────────────
    const ViewMyBookings = page.getByRole('button', {name: 'View My Bookings'});
    const viewDetailsBtn = page.getByRole("link", {name: "View Details"}).first();
    const cancelButton = page.getByRole("button", {name: "Cancel Booking"}).first();
    await ViewMyBookings.click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await viewDetailsBtn.click();
    await cancelButton.waitFor();
    await expect(page.getByText('Booking Information')).toBeVisible();

 // ── Step 4 — Validate booking ref ──────────────────────────────────────────────
    const bookingRF = (await page.locator('.font-mono').first().innerText()).trim();
    const eventTitle = (await page.getByRole('heading', {name: "Dilli Diwali Mela"}).innerText()).trim();
    expect(bookingRF[0]).toBe(eventTitle[0]);
    console.log(bookingRF);
    console.log(eventTitle);
    const checkRefundBtn = page.getByTestId('check-refund-btn');
    await checkRefundBtn.click();

 // ── Step 5 — Check refund eligibility ──────────────────────────────────────────────
    const snipper = page.locator('#refund-spinner');
    await expect(snipper).toBeVisible();
    await expect(snipper).not.toBeVisible({timeout: 6000});

    await page.pause();
 // ── Step 6 — Validate result ──────────────────────────────────────────────
    const refundResult = page.getByTestId('refund-result');
    await expect(refundResult).toBeVisible();
    await expect(refundResult).toContainText("Not eligible for refund.");

});


