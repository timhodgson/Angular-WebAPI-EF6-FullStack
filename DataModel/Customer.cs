namespace DataModel
{
    public class Customer
    {
        public int id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }

        public string FullInfo
        {
            get { return $"{FirstName} {LastName} e:{EmailAddress} p:{PhoneNumber}"; }
        }
    }
}
