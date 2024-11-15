WILKI

This project, titled Wilki, is a comprehensive e-commerce platform developed for a lab course project (Lab Course 2) and focuses on selling various pet products.

Project Team
Erind Avdiu 
Lekë Kelmendi
Vedat Aliu 
Ahmet Biba
Albin Lekiqi

Professor: BSc. Elton Boshnjaku

Functionalities:

1. Authentication and Authorization
JWT Authentication: The system uses JSON Web Tokens (JWT) for secure, stateless user authentication. This ensures that users stay logged in safely across sessions and devices.
Social Login: Users can log in with Google or Facebook accounts, simplifying the login process and allowing easy access.
Two-Factor Authentication (2FA): For an additional layer of security, 2FA is implemented, requiring users to authenticate with a second factor (e.g., a code sent to their mobile device) to access their account.

2. Address Management
Multiple Addresses: Each client can save multiple addresses, which are stored in a dedicated table. This feature allows users to easily select a preferred address during the checkout process, streamlining ordering for those with different shipping addresses.

3. Payments with Stripe
Stripe Integration: Secure payment handling is achieved through Stripe, allowing users to complete transactions with their bank cards directly in the app, ensuring safe, PCI-compliant payment processing.

4. Wishlist
Personal Wishlist: Every client can create a list of products they wish to purchase in the future, offering a personalized shopping experience and easy access to favorite items.

5. Data Export
Export Options: Data across various tables can be exported by users in multiple formats, including Excel, JSON, CSV, and plain text. This feature makes it easy for users or admins to manage, analyze, or report on data outside of the application.

6. Dynamic Tables
Filtering and Sorting: All tables allow users to filter results by search terms and sort them by any column. This functionality is essential for quickly finding specific data, especially in large datasets.

7. Invoice Management
Invoice Generation and Printing: Each completed order generates a detailed invoice that can be viewed, saved, and printed by the user. This provides a clear and professional record of all transactions.

8. Barcode and QR Code Integration
Barcodes: Each invoice includes a barcode containing the invoice number, which can be scanned for quick access or validation.
QR Codes: A QR code on each invoice contains complete details of the transaction, allowing users or admins to quickly retrieve order information.

9. Statistics for Admins
Sales and Customer Statistics: A dedicated admin dashboard offers comprehensive statistics on sales trends, most popular products, and customer data. This data helps the admin team make informed decisions on inventory, promotions, and customer engagement strategies.

10. Product Discounts
Scheduled Discounts: Discounts can be applied to products and scheduled to start and end on specific dates, allowing the business to automate promotional campaigns.

11. Discount Codes
Custom Promo Codes: The system allows admins to create discount codes, which can apply to the entire shopping cart or individual products. Each code has a predefined discount amount or percentage, allowing flexibility in promotions.

12. Business Information on Invoices
Business Data Display: Admins can input essential business details, such as the business name, unique identification number, VAT information, logo, and bank account details, which are displayed on each invoice. This ensures that all invoices look professional and contain legally required information.

13. Offers Slider on Homepage
Dynamic Offer Display: A homepage slider showcases special offers, discounts, or featured products, making it easy for customers to stay updated on the latest deals.

14. Product Ratings
Verified Customer Ratings: Only users who have purchased a product can leave a rating, ensuring that reviews are genuine and helpful for future buyers. This also allows users to make informed purchasing decisions based on real feedback.

15. Change Tracking
Action Logs: All actions within the system (adding, updating, or deleting data) are logged, recording the staff ID, action details, table name, and entity ID. This level of tracking ensures accountability and transparency.

16. Soft Deletion (isDeleted Attribute)
   Soft Delete Management: Items marked as deleted (products, categories, companies) remain in the database but are hidden from customer view. This feature helps maintain data integrity by keeping historical records in place, which prevents issues with orders, invoices, and statistical data related to removed items.

Tech Stack
The Wilki project was built using:

.NET Core for the backend
React.js for the frontend
MSSQL for structured data
MongoDB for unstructured data, like product photos and ratings
JWT for secure user authentication
Stripe for payment processing
Identity and MVC to structure the application


![Screenshot_15-11-2024_12332_localhost](https://github.com/user-attachments/assets/febb65ea-c90b-49b7-86c5-4adebb9c5df3)
![Screenshot_15-11-2024_12157_localhost](https://github.com/user-attachments/assets/5a2507f8-893e-463e-9627-c695d2eb4ce0)
![Screenshot_15-11-2024_12057_](https://github.com/user-attachments/assets/7e22213c-fbe4-462a-8fee-20a99e089793)
![Screenshot_15-11-2024_12025_localhost](https://github.com/user-attachments/assets/86a0b4e9-52a9-44f3-9a2f-3fd0c9de612d)
![Screenshot_15-11-2024_12015_localhost](https://github.com/user-attachments/assets/f125f800-7840-4dfe-9787-21b4edeee3bc)
![Screenshot_15-11-2024_11935_localhost](https://github.com/user-attachments/assets/17fb3e01-f821-4202-9d18-7f7229a177a0)
![Screenshot_15-11-2024_11913_localhost](https://github.com/user-attachments/assets/403f837e-f696-4410-9d6b-2e87b7055510)
![Screenshot_15-11-2024_11858_localhost](https://github.com/user-attachments/assets/b3e14957-efe9-49fe-8edb-7f18de5d2a00)
![Screenshot_15-11-2024_05914_localhost](https://github.com/user-attachments/assets/7b5da049-7cb8-4172-a897-df5afc6472e5)
![Screenshot_15-11-2024_05813_localhost](https://github.com/user-attachments/assets/b12d4249-96a0-45c2-9778-af07dbbdf476)
![Screenshot_15-11-2024_05755_localhost](https://github.com/user-attachments/assets/dc5c668e-5429-4f3a-aa3d-547966fa6a43)
![Screenshot_15-11-2024_05748_localhost](https://github.com/user-attachments/assets/e992830f-5c08-4034-ab98-eb1b513aa137)
![Screenshot_15-11-2024_05733_localhost](https://github.com/user-attachments/assets/af359242-2883-480f-be93-d8c8a1c08f6b)
![Screenshot_15-11-2024_05649_localhost](https://github.com/user-attachments/assets/a7c5d93e-bea3-4095-9ae8-eaa0d428d44a)
![Screenshot_15-11-2024_05621_localhost](https://github.com/user-attachments/assets/725c50af-8227-47b0-8f19-39f80409f954)
![Screenshot_15-11-2024_04758_localhost](https://github.com/user-attachments/assets/af167f6d-82a3-4c00-84c9-c9f8bad2057f)
![Screenshot_15-11-2024_04539_localhost](https://github.com/user-attachments/assets/0e17d9c1-7a47-4ac1-9fde-26068aa0dba9)
![Screenshot_15-11-2024_04525_localhost](https://github.com/user-attachments/assets/5dd70273-28f7-46b5-b0bc-997f573e680e)
![Screenshot_15-11-2024_1202_localhost](https://github.com/user-attachments/assets/918dc599-d88b-4d81-bbce-d45359842c5d)
![Screenshot_15-11-2024_1123_localhost](https://github.com/user-attachments/assets/246cbed9-d213-42a3-82f8-4a684fa25e0f)
![Screenshot_15-11-2024_1059_localhost](https://github.com/user-attachments/assets/69f17180-c912-4927-9a20-1bc9e1384a34)
![Screenshot_15-11-2024_1050_localhost](https://github.com/user-attachments/assets/cab8274a-f23b-4fef-922e-632e7a0d8a4a)
![Screenshot_15-11-2024_1040_localhost](https://github.com/user-attachments/assets/3e284ef8-5cca-4754-a675-ff420afc24bc)
![Screenshot_15-11-2024_1024_localhost](https://github.com/user-attachments/assets/e5227717-ab7b-4f98-be71-15161c0183a1)
![Screenshot_15-11-2024_1016_localhost](https://github.com/user-attachments/assets/dbbe6f18-7854-4aa5-ad52-c5f758628b30)
![Screenshot_15-11-2024_0596_localhost](https://github.com/user-attachments/assets/c289baf0-5266-43bf-92fe-211263b28ac4)
![Screenshot_15-11-2024_0586_localhost](https://github.com/user-attachments/assets/0aaa1a15-4053-46c4-a1c7-b6be44e501be)
![Screenshot_15-11-2024_0575_localhost](https://github.com/user-attachments/assets/3879b852-1317-43f0-a78e-21225a8986c3)
![Screenshot_15-11-2024_0569_localhost](https://github.com/user-attachments/assets/14d8501f-881b-4737-9def-0459ac9c527c)
![Screenshot_15-11-2024_0463_localhost](https://github.com/user-attachments/assets/1c6cde5b-7ddd-439c-829c-705d57716f3f)
![Screenshot_15-11-2024_119_localhost](https://github.com/user-attachments/assets/48137f51-9888-43d4-8ade-c9ddb319924a)
[WLK-151124-15-12.pdf](https://github.com/user-attachments/files/17759874/WLK-151124-15-12.pdf)
