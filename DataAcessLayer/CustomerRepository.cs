using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace DataAccessLayer
{
    public class CustomerRepository : ICustomerRepository
    {
        #region Member variables
        private ApplicationDbContext _databaseContext;
        #endregion

        public CustomerRepository(ApplicationDbContext ctx)
        {
            _databaseContext = ctx;
        }

        public List<Customer> GetAllCustomers()
        {
            try
            {
                var customers = _databaseContext.Customers
                 .OrderBy(b => b.LastName)
                    .ToList();
                return customers;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Customer> GetCustomersByFirstName(string FirstName)
        {
            try
            {
                var customers = _databaseContext.Customers
                 .Where(b => b.FirstName == FirstName)
                 .OrderBy(b => b.LastName)
                    .ToList();
                return customers;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Customer GetCustomerById(int id)
        {
            try
            {
                var customer = _databaseContext.Customers
                 .Where(b => b.id == id)
                    .FirstOrDefault();
                return customer;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Add(Customer customer)
        {
            try
            {
                _databaseContext.Customers.Add(customer);
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Edit(Customer customer)
        {
            try
            {
                _databaseContext.Customers.Update(customer);
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Delete(int id)
        {
            try
            {
                var customer = _databaseContext.Customers
                 .Where(b => b.id == id)
                    .FirstOrDefault();

                _databaseContext.Customers.Remove(customer);
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
