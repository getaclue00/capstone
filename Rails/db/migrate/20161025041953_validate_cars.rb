class ValidateCars < ActiveRecord::Migration[5.0]
  def up
    #note that there are additional checks in the model
    change_column_null :cars, :make, false

    change_column_null :cars, :model, false

    change_column_null :cars, :size, false

    change_column_null :cars, :interior, false

    change_column_null :cars, :colour, false
	end
  
  def down
    change_column_null :cars, :make, true

    change_column_null :cars, :model, true

    change_column_null :cars, :size, true

    change_column_null :cars, :interior, true
    
    change_column_null :cars, :colour, true
  end
end

