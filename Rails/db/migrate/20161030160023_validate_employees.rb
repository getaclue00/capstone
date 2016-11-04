class ValidateEmployees < ActiveRecord::Migration[5.0]
 def up
    # note that there are additional checks in the model

  	#city and province are not required for now
    change_column_null :employees, :last_name, false

    change_column_null :employees, :first_name, false

 	  change_column_null :employees, :email, false
 	  add_index :employees, :email, unique: true

 	change_column :employees, :phone_number, :string, :limit => 12
  	change_column_null :employees, :phone_number, false

  	change_column :employees, :street_number, :integer
  	change_column_null :employees, :street_number, false
 
  	change_column_null :employees, :street_name, false

  	change_column :employees, :postal_code, :string, :limit => 7
  	change_column_null :employees, :postal_code, false

  	change_column :employees, :start_date, :date, :default => Date.today
  	change_column_null :employees, :start_date, false

    change_column :employees, :is_admin, :boolean, :default => false
  	change_column_null :employees, :is_admin, false
	end
  
  def down
    change_column_null :employees, :last_name, true

    change_column_null :employees, :first_name, true

  	change_column_null :employees, :email, true
  	remove_index :employees, column: :email

  	change_column :employees, :phone_number, :string, :limit => nil
  	change_column_null :employees, :phone_number, true

  	change_column_null :employees, :street_number, true

  	change_column_null :employees, :street_name, true
  	
  	change_column :employees, :postal_code, :string, :limit => nil
  	change_column_null :employees, :postal_code, true

  	change_column :employees, :start_date, :date, :default => nil
  	change_column_null :employees, :start_date, true

  	change_column :employees, :is_admin, :boolean, :default => nil
  	change_column_null :employees, :is_admin, true
  end
end
